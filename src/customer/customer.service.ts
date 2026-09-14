import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { PatchCustomerDto } from './dto/patch-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { Customer } from './interfaces/customer.interface.js';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  ];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: number): Customer {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // POST method to create a new customer
  createCustomer(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer = {
      id: this.customers.length + 1,
      ...createCustomerDto,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  // PUT method to update an existing customer
  updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Customer {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateCustomerDto,
    };
    return this.customers[customerIndex];
  }

  // PATCH method to partially update an existing customer
  patchCustomer(
    id: number,
    patchCustomerDto: Partial<PatchCustomerDto>,
  ): Customer {
    console.log('PatchCustomerDto:', patchCustomerDto); // Log the received DTO for debugging

    const customer = this.getCustomerById(id);
    console.log('Customer:', customer); // Log the customer to be updated

    // // Update the customer with the new data
    const updatedCustomer = {
      ...customer,
      ...Object.fromEntries(
        Object.entries(patchCustomerDto).filter(
          ([_, value]) => value !== undefined,
        ),
      ),
    };
    return updatedCustomer;
  }

  // DELETE method to remove a customer
  deleteCustomer(id: number): Customer {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    const deletedCustomer = this.customers.splice(customerIndex, 1);
    return deletedCustomer[0];
  }
}
