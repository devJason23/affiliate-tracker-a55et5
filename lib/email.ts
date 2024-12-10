export const sendEmail = async ({ to, subject, template, data }: {
  to: string;
  subject: string;
  template: string;
  data: any;
}) => {
  // Implement your email sending logic here
  console.log(`Sending email to ${to} with subject: ${subject}`);
  // For now, we'll just log the email details
}
