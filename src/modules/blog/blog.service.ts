import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, processPagination } from 'utils';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsRequest } from './dto/get-blogs.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  async findAndCount(options?: FindManyOptions<Blog>): Promise<[Blog[], number]> {
    return await this.blogRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<Blog>): Promise<Blog | null> {
    return await this.blogRepository.findOne(options);
  }

  async save(data: Partial<Blog> | Partial<Blog>[]): Promise<Blog | Blog[]> {
    if (Array.isArray(data)) {
      return await this.blogRepository.save(data);
    } else {
      return await this.blogRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<Blog>, data: Partial<Blog>): Promise<UpdateResult> {
    return await this.blogRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<Blog>): Promise<UpdateResult> {
    return await this.blogRepository.softDelete(criteria);
  }

  async create(createBlogDto: CreateBlogDto) {
    await this.save(createBlogDto);
    return getSuccessResponse({ message: 'Blog Added Successfully', response: {} });
  }

  async getAllAndCount(getBlogs: GetBlogsRequest) {
    const { limit, offset, order, search } = getBlogs;
    const { skip, take } = processPagination({ limit, offset });
    let where: FindOptionsWhere<Blog>[] | FindOptionsWhere<Blog> = []
    if (search) {
      // where.push({ title: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }, { subTitle: ILike(`%${search}%`) })
      // { title: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }, { subTitle: ILike(`%${search}%`) }
      where.push({ title: ILike(`%${search}%`) },{ description: ILike(`%${search}%`) },{ subTitle: ILike(`%${search}%`) })
    } else {

      where = {}
    }
    const [blogs, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where });
    const response = {
      data: blogs,
      totalCount,
    };
    return getSuccessResponse({ message: 'Blogs fetched successfully', response });
  }

  async getOne(id: string) {
    const blog = await this.findOne({ where: { id } });
    const message = 'Blog fetched successfully.';
    if (blog) {
      return getSuccessResponse({ message, response: { blog } });
    } else {
      return getSuccessResponse({ message, response: {} });
    }
  }

  async modify(id: string, updateBlogDto: UpdateBlogDto) {
    await this.update({ id }, updateBlogDto);
    return getSuccessResponse({ message: 'Blog Updated Successfully.', response: {} });
  }

  async deleteOne(id: string) {
    await this.remove({ id });
    return getSuccessResponse({ message: 'Blog Removed Successfully.', response: {} });

  }
}
