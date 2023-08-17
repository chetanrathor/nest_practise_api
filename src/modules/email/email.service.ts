import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as nodemailer from 'nodemailer'
import { ApiConfigService } from 'shared/api-config.service';
@Injectable()
export class EmailService {
  constructor(private apiConfigService: ApiConfigService) {

  }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }

  // getTransport() {

  //   const { host, name, pass, port, user } = this.apiConfigService.SMTPConfigurations

  //   return nodemailer.createTransport({
  //    host:'',
  //    port:''
  //   })

  // }

  // async sendEmail() {
  //   const transporter = this.getTransport()
  //   const info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //     to: "bar@example.com, baz@example.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>", // html body
  //   });
  // }
}
