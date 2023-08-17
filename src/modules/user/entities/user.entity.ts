import { Column, Entity, OneToMany } from 'typeorm';
import { RoleType, SignUpType } from '../../../constants';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Address } from '../../../modules/adress/entities/adress.entity';
import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { Consultation } from '../../../modules/consultation/entities/consultation.entity';
import { Order } from '../../../modules/order/entities/order.entity';
import { Transaction } from '../../../modules/transaction/entities/transaction.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ length: 255, nullable: true })
  fullName: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ length: 80, })
  email: string;

  @Column({ length: 80, nullable: true })
  authToken: string;

  @Column({ length: 80, nullable: true })
  deviceToken: string;

  @Column({ length: 20, nullable: true  })
  mobileNumber: string;

  @Column({ length: 4, nullable: true  })
  countryCode: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  

  @Column({ default: false })
  isTncAccepted: boolean;

  @Column({ default: false })
  isLoggedIn: boolean;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ type: 'enum', enum: SignUpType, default: SignUpType.EMAIL })
  signUpType: SignUpType;

  @Column({ length: 255 ,nullable: true  })
  socialId: string;

  @OneToMany((type) => Address, (address) => address.user)
  addresses: Address[]

  @OneToMany((type) => Appointment, (appointment) => appointment.user)
  appointments: Appointment[]

  @OneToMany((type) => Consultation, (consultation) => consultation.vet)
  consultations: Consultation[]

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[]

  @OneToMany((type) => Transaction, (transaction) => transaction.user)
  transactions: Transaction[]

}
