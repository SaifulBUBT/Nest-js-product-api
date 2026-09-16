import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { PatchCustomerDto } from './dto/patch-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCustomers() {
    return this.customerService.getAllCustomers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    // Logic to create a new customer using the data from createCustomerDto
    return this.customerService.createCustomer(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    // Logic to update the customer with the given id using the data from updateCustomerDto
    // You can implement this logic in the CustomerService
    return this.customerService.updateCustomer(Number(id), updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchCustomer(
    @Param('id') id: string,
    @Body() patchCustomerDto: PatchCustomerDto,
  ) {
    // Logic to partially update the customer with the given id using the data from updateCustomerDto
    // You can implement this logic in the CustomerService
    return this.customerService.patchCustomer(Number(id), patchCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    // Logic to delete the customer with the given id
    // You can implement this logic in the CustomerService
    return this.customerService.deleteCustomer(Number(id));
  }
}
