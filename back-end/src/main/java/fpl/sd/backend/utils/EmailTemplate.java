package fpl.sd.backend.utils;

public class EmailTemplate {
    public static String generateEmailTemplate(String otpCode) {
        return "<div style=\"font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2\">\n" +
                "  <div style=\"margin:50px auto;width:70%;padding:20px 0\">\n" +
                "    <div style=\"border-bottom:1px solid #eee\">\n" +
                "      <a href=\"\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">SuperTeam Shop Shoe</a>\n" +
                "    </div>\n" +
                "    <p style=\"font-size:1.1em\">Hi,</p>\n" +
                "    <p>Thank you for choosing SuperTeam Shop Shoe. Use the following OTP to complete your reset password procedures. OTP is valid for 5 minutes</p>\n" +
                "    <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">" + otpCode + "</h2>\n" +
                "    <p style=\"font-size:0.9em;\">Regards,<br />SuperTeam Shop Shoe</p>\n" +
                "    <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "    <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "      <p>SuperTeam Shop Shoe</p>\n" +
                "      <p>FPL Ho Chi Minh</p>\n" +
                "      <p>Ho Chi Minh City</p>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>";
    }
}
