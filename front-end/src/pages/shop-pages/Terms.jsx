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

export function Terms() {
    return (
        <div className="mt-5 mb-5 bg-white p-5">
            <div className="mt-10 p-10" >
            <h1 className="mt-5 text-xl font-bold text-center text-black">Terms and Conditions</h1>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                  Terms and conditions of SuperTeam website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <p className="text-[20px]">
                    1. Introduction:

                    Welcome to SuperTeam website. By using this website and our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any of these terms, please stop using our website.
                    <br/>
                    2. Services:

                    We offer a range of footwear products, including sneakers, formal shoes, fashion shoes, and related accessories. Our services include providing product information, online sales, delivery, and customer support.
                    <br/>
                    3. Ownership and Use of the Website:

                    This website and all content, including design, text, images, icons, logos, and other components, are the property of us or our content providers. You may not copy, reproduce, distribute, publicly display, modify, or exploit any part of this website without our explicit permission.
                    <br/>
                    4. Ordering and Transactions:

                    When you place an order on our website, you agree that the information you provide is accurate and complete. We reserve the right to refuse or cancel any order if incorrect information or violations of our website’s policies are detected.
                    <br/>
                    5. Payment:

                    We offer various payment methods, including credit cards, debit cards, bank transfers, and other electronic payment methods. You agree to pay the full amount for products you purchase on our website through the supported payment methods.
                    <br/>
                    6. Return Policy:

                    If you are not satisfied with a purchased product, you can request a return within [number of days] days from receipt of the item, provided that the product has not been used and is still in its original packaging.
                    <br/>
                    7. Our Rights:

                    We reserve the right to change or modify these terms and conditions at any time without prior notice. Your continued use of the website after such changes will constitute your acceptance of the modified terms.
                    <br/>
                    8. Contact:

                    If you have any questions regarding these terms and conditions, please contact us via email or phone as listed on our website.
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
  
  
  export default Terms;