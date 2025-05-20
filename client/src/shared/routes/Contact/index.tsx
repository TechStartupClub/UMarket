import React from 'react';
import styles from './contact.module.css';
import logo from '../../../assets/logos/tsc/Tech_Startup_Club_Logo.png';
import { useForm } from "react-hook-form";

export default function Contact() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data: any) => {
      console.log("Form Submitted", data);
      alert("Message Sent!");
    };
  
    return (
        <div className={styles.container}>
            {/* Main Content */}
            <div className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Contact Us</h1>
                
                <div className={styles.contentWrapper}>
                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            {/* Email */}
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className={styles.errorMessage}>Email is required</p>
                                )}
                            </div>
                
                            {/* Name */}
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className={styles.input}
                                    placeholder="Name"
                                />
                            </div>
                
                            {/* Reason */}
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    {...register("reason")}
                                    className={styles.input}
                                    placeholder="Reason"
                                />
                            </div>
                
                            {/* Message */}
                            <div className={styles.formGroup}>
                                <textarea
                                    {...register("message")}
                                    className={styles.textarea}
                                    placeholder="Write your message"
                                    rows={5}
                                />
                            </div>
                
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                    
                    {/* Info Sidebar */}
                    <div className={styles.infoSidebar}>
                        <div className={styles.logoContainer}>
                            <img
                                src={logo}
                                alt="Tech Startup Club"
                                className={styles.logo}
                            />
                        </div>
                        <p className={styles.infoText}>Have any questions? We are happy to hear it.</p>
                        
                        <div className={styles.linkList}>
                            <div className={styles.linkItem}>Frequently asked questions</div>
                            <div className={styles.linkItem}>Data & Privacy</div>
                            <div className={styles.linkItem}>Payments & refunds</div>
                            <div className={styles.linkItem}>Terms of Service</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}