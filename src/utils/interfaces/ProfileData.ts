interface ProfileData {
    // id: UUID,
    CreatedAt: Date,
    AssociatedAt: Date;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    AdmissionCode: string;
    PermanentCode: string;
    Address: Address;
    Groups: Array<number>;
    Email: string;
    RecoveryEmail: string;
    AccountStatus: string;
    Role: string;
}
