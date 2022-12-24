export interface ScheduleAppointmentInputDTO {
  patientId: string;
  dentistId: string;
  startsAt: string;
  endsAt: string;
}

export interface ScheduleAppointmentOutputDTO {
  id: string;
  patientId: string;
  dentistId: string;
  startsAt: Date;
  endsAt: Date;
  canceledAt: Date | null;
  createdAt: Date;
}
