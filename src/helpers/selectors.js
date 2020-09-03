export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((oneDay) => day === oneDay.name);
  if (foundDay === undefined || state.days.length === 0) return [];
  return foundDay.appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer]
  if (!interviewer) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: interviewer
  };
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((oneDay) => day === oneDay.name);
  if (foundDay === undefined || state.days.length === 0) return [];
  return foundDay.interviewers.map((id) => state.interviewers[id]);
}

