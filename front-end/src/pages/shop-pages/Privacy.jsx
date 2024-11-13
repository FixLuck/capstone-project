import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

export function Privacy() {
    return (
        <div className="mt-5 mb-5 bg-white p-5">
            <div className="mt-10 p-10" >
            <h1 className="mt-5 text-xl font-bold text-center text-black">Privaty Policy</h1>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                    Privacy policy of SuperTeam website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <p className="text-[20px]">
                    1. Information We Collect

                    When you use our services, we may collect the following information:

                    Personal Information: Name, address, phone number, email, and payment details when you make a purchase.
                    Automatically Collected Information: IP address, device type, browser, and other data related to your use of the website.
                    <br/>
                    2. How We Use the Information

                    We use the information collected for the following purposes:

                    Processing orders and shipping.
                    Providing customer service.
                    Sending notifications about products, promotions, and offers.
                    Improving user experience and optimizing the website.
                    <br/>
                    3. Data Security

                    We are committed to protecting your personal information and employ reasonable security measures to prevent unauthorized access, alteration, disclosure, or destruction of your data. However, no security system is 100% secure, and we cannot guarantee absolute safety of your data.
                    <br/>
                    4. Sharing Information

                    We do not sell, rent, or share your personal information with third parties except with your consent or as required by law.
                    <br/>
                    5. Cookies

                    Our website may use cookies to collect information about your activities on the website, which helps us improve the user experience and serve you better. You can refuse cookies through your browser settings.
                    <br/>
                    6. Your Rights

                    You have the right to request access, correction, or deletion of your personal information that we store. If you have any questions or requests regarding your privacy rights, please contact us.
                    <br/>
                    7. Changes to the Privacy Policy

                    We may update or modify this Privacy Policy at any time. Any changes will take effect immediately when posted on the website.
                    <br/>
                    8. Contact

                    If you have any questions regarding this Privacy Policy, please contact us via email or phone as listed on our website.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                <Link to="/register" className="flex items-center px-4 py-2 bg-black text-white rounded">
                    <FontAwesomeIcon icon={faArrowLeft} /> Have you read and understood all the content ? Go back Sign Up.
                </Link>
              </CardFooter>
            </Card>
            </div>
      </div>
  
    );
  }
  
  
  export default Privacy;