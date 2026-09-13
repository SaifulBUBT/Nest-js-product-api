import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  private customers = [
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

  getAllCustomers() {
    return this.customers;
  }

  getCustomerById(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // POST method to create a new customer
  createCustomer(data: { name: string; email: string }) {
    const newCustomer = {
      id: this.customers.length + 1,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  // PUT method to update an existing customer
  updateCustomer(id: number, data: { name?: string; email?: string }) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...data,
    };
    return this.customers[customerIndex];
  }

  // PATCH method to partially update an existing customer
  patchCustomer(id: number, data: Partial<{ name: string; email: string }>) {
    const customer = this.getCustomerById(id);
    Object.assign(customer, data);
    return customer;
  }

  // DELETE method to remove a customer
  deleteCustomer(id: number) {
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
