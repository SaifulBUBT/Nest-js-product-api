import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { PatchCustomerDto } from './dto/patch-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { Customer } from './interfaces/customer.interface.js';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class CustomerService {

 constructor(private readonly databaseService: DatabaseService) {}

  // private customers: Customer[] = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //   },
  // ];

  //Get all customers from the database
 
  async getAllCustomers(): Promise<Customer[]> {
    const result = await this.databaseService.query(
      'SELECT * FROM customers'
    );
    return result.rows;
  }

  // Get a customer by ID from the database
  async getCustomerById(id: number): Promise<Customer> {   
    const result = await this.databaseService.query(
      'SELECT * FROM customers WHERE id = $1',
      [id],
    );
    const customer = result.rows[0];
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // POST method to create a new customer
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, email } = createCustomerDto;
    const result = await this.databaseService.query(
      'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *',
      [name, email],
    );
    return result.rows[0];

    // const newCustomer = {
    //   id: this.customers.length + 1,
    //   ...createCustomerDto,
    // };
    
    // this.customers.push(newCustomer);
    // return newCustomer;
  }

  // PUT method to update an existing customer
  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {

    // const customerIndex = this.customers.findIndex(
    //   (customer) => customer.id === id,
    // );
    // if (customerIndex === -1) {
    //   throw new NotFoundException(`Customer with ID ${id} not found`);
    // }
    // this.customers[customerIndex] = {
    //   ...this.customers[customerIndex],
    //   ...updateCustomerDto,
    // };
    // return this.customers[customerIndex];

      const { name, email } = updateCustomerDto;

      const result = await this.databaseService.query(
        `UPDATE customers
        SET name = $1, email = $2
        WHERE id = $3
        RETURNING *`,
        [name, email, id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(
          `Customer with ID ${id} not found`,
        );
      }

      return result.rows[0];

  }

  // PATCH method to partially update an existing customer
  async patchCustomer(
    id: number,
    patchCustomerDto: Partial<PatchCustomerDto>,
  ): Promise<Customer> {

    // console.log('PatchCustomerDto:', patchCustomerDto); // Log the received DTO for debugging

    // const customer = this.getCustomerById(id);
    // console.log('Customer:', customer); // Log the customer to be updated

    // // // Update the customer with the new data
    // const updatedCustomer = {
    //   ...customer,
    //   ...Object.fromEntries(
    //     Object.entries(patchCustomerDto).filter(
    //       ([_, value]) => value !== undefined,
    //     ),
    //   ),
    // };

    // console.log('UpdatedCustomer:', updatedCustomer); // Log the updated customer for debugging

    // const customerIndex = this.customers.findIndex((customer) => customer.id === id);
    // this.customers[customerIndex] = updatedCustomer; // Update the customer in the array with the new data

    // return updatedCustomer;

     const fields: string[] = [];
      const values: unknown[] = [];

      if (patchCustomerDto.name !== undefined) {
        fields.push(`name = $${values.length + 1}`);
        values.push(patchCustomerDto.name);
      }

      if (patchCustomerDto.email !== undefined) {
        fields.push(`email = $${values.length + 1}`);
        values.push(patchCustomerDto.email);
      }

      if (fields.length === 0) {
        return this.getCustomerById(id);
      }

      values.push(id);

      const result = await this.databaseService.query(
        `UPDATE customers
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *`,
        values,
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(
          `Customer with ID ${id} not found`,
        );
      }

      return result.rows[0];
  }

  // DELETE method to remove a customer
  async deleteCustomer(id: number): Promise<Customer> {
    // const customerIndex = this.customers.findIndex(
    //   (customer) => customer.id === id,
    // );
    // if (customerIndex === -1) {
    //   throw new NotFoundException(`Customer with ID ${id} not found`);
    // }
    // const deletedCustomer = this.customers.splice(customerIndex, 1);
    // return deletedCustomer[0];

    const result = await this.databaseService.query(
      'DELETE FROM customers WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return result.rows[0];
  }
}
