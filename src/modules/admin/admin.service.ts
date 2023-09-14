import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'modules/appointment/appointment.service';
import { BlogService } from 'modules/blog/blog.service';
import { ConsultationService } from 'modules/consultation/consultation.service';
import { OrderService } from 'modules/order/order.service';
import { ProductBrandService } from 'modules/product-brand/product-brand.service';
import { ProductService } from 'modules/product/product.service';
import { TransactionService } from 'modules/transaction/transaction.service';
import { UserService } from 'modules/user/user.service';
import { FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse } from 'utils';
import { Admin } from './entities/admin.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly productService: ProductService,
    private readonly brandService: ProductBrandService,
    private readonly orderService: OrderService,
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService,
    private readonly consultationService: ConsultationService,
    private readonly transactionService: TransactionService,
    private readonly blogService: BlogService

  ) { }


  async findOne(options: FindOneOptions<Admin>): Promise<Admin | null> {
    return await this.adminRepository.findOne(options);
  }



  async update(criteria: FindOptionsWhere<Admin>, data: Partial<Admin>): Promise<UpdateResult> {
    return await this.adminRepository.update(criteria, data);
  }

  async getDashboard() {

    const [, productsCount] = await this.productService.findAndCount()
    const [, brandsCount] = await this.brandService.findAndCount()
    const [, ordersCount] = await this.orderService.findAndCount()
    const [, appointmentsCount] = await this.appointmentService.findAndCount()
    const [, usersCount] = await this.userService.findAndCount()
    const [, consultationsCount] = await this.consultationService.findAndCount()
    const [, blogsCount] = await this.blogService.findAndCount()
    const [, transactionsCount] = await this.transactionService.findAndCount()
    const random = Math.floor(Math.random() * 9999)
    const response = {
      productsCount,
      brandsCount,
      ordersCount,
      appointmentsCount,
      usersCount,
      consultationsCount,
      blogsCount,
      transactionsCount,
      totalProfit: random,
      totalLoss: random,
    }
    return getSuccessResponse({ message: 'Dashboard data fetch sucessfully', response })
  }


}