import * as fs from 'fs';
import publish from './publisher.js';

class CustomerInvitationSystem {
  private fintechCoordinates = { latitude: 52.493256, longitude: 13.446082 };
  private maxDistanceInKm = 100;

  private readFile(filePath: string): string[] {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return fileContent.trim().split('\n');
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      return [];
    }
  }

  private calculateGreatCircleDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371; // Radius of the Earth in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private publishToMessageBroker(customerIds: string[]): void {
    // Simulating message publishing, replace with actual message broker logic
    console.log('Publishing customer IDs to the message broker:');
    customerIds.forEach((customerId) => {
      publish(customerId)
      console.log(customerId)
    });
  }

  inviteCustomersWithinRadius(customerFilePath: string): void {
    const customerData = this.readFile(customerFilePath);
    const invitedCustomerIds: string[] = [];

    customerData.forEach((customer) => {
      const [customerId, latStr, lonStr] = customer.split(',');
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(lonStr);

      if (!customerId || isNaN(latitude) || isNaN(longitude)) {
        console.warn(`Invalid data for customer: ${customer}`);
        return; // Skip invalid data
      }

      const distance = this.calculateGreatCircleDistance(
        this.fintechCoordinates.latitude,
        this.fintechCoordinates.longitude,
        latitude,
        longitude
      );

      if (distance <= this.maxDistanceInKm) {
        invitedCustomerIds.push(customerId);
      }
    });

    invitedCustomerIds.sort();
    this.publishToMessageBroker(invitedCustomerIds);
  }
}

// Example usage
const invitationSystem = new CustomerInvitationSystem();
invitationSystem.inviteCustomersWithinRadius('./somecustomer.txt');