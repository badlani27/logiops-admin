/**
 * Mock driver data layer.
 */

export type DriverStatus = "available" | "on_route" | "off_duty" | "maintenance";

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  status: DriverStatus;
  currentLocation: string;
  assignedVehicle: string;
  completedTrips: number;
  rating: number; // 1–5
  hiredAt: string;
}

export const mockDrivers: Driver[] = [
  {
    id: "DRV-001",
    name: "Maria Santos",
    licenseNumber: "CDL-4521",
    status: "on_route",
    currentLocation: "I-90 near Cleveland, OH",
    assignedVehicle: "Truck #12",
    completedTrips: 342,
    rating: 4.8,
    hiredAt: "2021-03-15",
  },
  {
    id: "DRV-002",
    name: "James O'Brien",
    licenseNumber: "CDL-7893",
    status: "available",
    currentLocation: "Chicago Hub",
    assignedVehicle: "Truck #07",
    completedTrips: 189,
    rating: 4.5,
    hiredAt: "2022-07-20",
  },
  {
    id: "DRV-003",
    name: "Priya Patel",
    licenseNumber: "CDL-3345",
    status: "on_route",
    currentLocation: "I-5 near Sacramento, CA",
    assignedVehicle: "Truck #19",
    completedTrips: 521,
    rating: 4.9,
    hiredAt: "2020-01-10",
  },
  {
    id: "DRV-004",
    name: "Robert Kim",
    licenseNumber: "CDL-6672",
    status: "off_duty",
    currentLocation: "Dallas Terminal",
    assignedVehicle: "Truck #03",
    completedTrips: 98,
    rating: 4.2,
    hiredAt: "2024-02-28",
  },
  {
    id: "DRV-005",
    name: "Elena Volkov",
    licenseNumber: "CDL-1189",
    status: "maintenance",
    currentLocation: "Denver Service Center",
    assignedVehicle: "Truck #21",
    completedTrips: 267,
    rating: 4.6,
    hiredAt: "2021-11-05",
  },
];

export function getDrivers(): Driver[] {
  return mockDrivers;
}

export function getDriverById(id: string): Driver | undefined {
  return mockDrivers.find((d) => d.id === id);
}

export function getDriversByStatus(status: DriverStatus): Driver[] {
  return mockDrivers.filter((d) => d.status === status);
}
