import React, { useState } from "react";

import '../../index.css';



export function WelcomeAdmin() {
    return (
     

        <div>

          {/* Welcome Image */}
          <div className="flex items-center justify-center h-svh">
            <img className="w-svw" src="admin-images/welcome.png" alt="Welcome" />
          </div>
        </div>

    );
}

export default WelcomeAdmin;
