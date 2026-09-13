import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service.js';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(Number(id));
  }

  @Post()
  createCustomer(@Body() data: { name: string; email: string }) {
    // Logic to create a new customer using the data from createCustomerDto
    return this.customerService.createCustomer(data);
  }

  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() data: { name: string; email: string },
  ) {
    // Logic to update the customer with the given id using the data from updateCustomerDto
    // You can implement this logic in the CustomerService
    return this.customerService.updateCustomer(Number(id), data);
  }

  @Patch(':id')
  patchCustomer(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; email: string }>,
  ) {
    // Logic to partially update the customer with the given id using the data from updateCustomerDto
    // You can implement this logic in the CustomerService
    return this.customerService.patchCustomer(Number(id), data);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    // Logic to delete the customer with the given id
    // You can implement this logic in the CustomerService
    return this.customerService.deleteCustomer(Number(id));
  }
}
