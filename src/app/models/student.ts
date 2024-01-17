export interface Student {
  students: {
    id: string;
    createdAt: Date | null;
    lastUpdatedAt: Date | null;
    studentId: string | null;
    name: string;
    department: string;
    session: string;
    phone: string | null;
    gender: string;
    bloodGroup: string | null;
    lastDonatedAt: Date | null;
    address: string | null;
  }[];
  message: string;
  isSuccess: boolean;
}