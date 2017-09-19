using System.Threading.Tasks;
using System.Net.Mail;
using System.Web;
using System.Net.Mime;
using System;

namespace Infrastructure.Services.EmailSender
{
    public class EmailService
    {
        public Task SendAsync(string sendTo, string subject, string text)
        {
            return Task.Factory.StartNew(() =>
            {
                SendEmail(sendTo, subject, text);
            });
        }

        void SendEmail(string sendTo, string subject, string text)
        {

            // MailMessage message = new MailMessage("pa.idziak@gmail.com", sendTo, subject, text);

            var emailBody = HttpUtility.HtmlEncode(text);
            var signature = HttpUtility.HtmlEncode("<br><p>Regards,</p><p>Paweł Idziak</p>");
            var body = HttpUtility.HtmlDecode(emailBody + signature);

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("pa.idziak@gmail.com");
            msg.To.Add(new MailAddress(sendTo));
            msg.Subject = subject;
            msg.IsBodyHtml = true;
            msg.Body = body;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("pa.idziak@gmail.com", "rchnovetc2");
            smtpClient.Credentials = credentials;
            smtpClient.EnableSsl = true;

            smtpClient.Send(msg);
        }

    }
}