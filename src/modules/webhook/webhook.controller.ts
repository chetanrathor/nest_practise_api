import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { WebhookResponse } from 'interfaces/stripe-webhook';
import {Response} from 'express'

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) { }

  @Post()
  create(@Body() createWebhookDto: WebhookResponse,@Res() res:Response) {
    try {
      
      const response  = this.webhookService.callBack(createWebhookDto) 
    } catch (error) {
      console.log('error', error)
    }
    
    // if (createWebhookDto.type === 'payment_intent.succeeded') {
    //   // Perform actions like updating your database or handling the successful payment
    //   console.log(createWebhookDto, "========================")

    //   // Redirect the user
    //   // res.redirect('http://localhost:3000/success'); // Redirect to a success page
    //   // return { url: 'http://localhost:3000/home' }
    //   res.redirect('http://localhost:3000/home')

    // }
    res.status(200).send()
    // return this.webhookService.create(createWebhookDto);
  }

  @Get()
  findAll() {
    return this.webhookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhookService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(+id);
  }
}
