interface ProfileData {
    // id: UUID,
    createdAt: Date,
    associatedAt: Date;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    admissionCode: string;
    permanentCode: string;
    address: Address;
    groups: Array<number>;
    email: string;
    recoveryEmail: string;
    accountStatus: string;
    role: string;
}