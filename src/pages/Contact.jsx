import React, { useState } from 'react';
import SideBar from "../components/SideBar";
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle, XCircle, Loader } from 'lucide-react';
import DecryptedText from "../components/Decrypting";
import { sendContactForm } from "../api/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Transmitting data...' });

    try {
      const response = await sendContactForm(formData);
      setStatus({ type: 'success', message: response.data.message || 'Message sent successfully!' });
      setFormData({ fullname: "", email: "", subject: "", message: "" });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Transmission failed. Please try again.';
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  return (
    <div className="flex min-h-screen font-mono"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

      <SideBar />

      <div className="flex-1 w-full md:w-4/5 p-6 md:p-8 overflow-y-auto min-h-screen relative">
        <div className="max-w-6xl w-full mx-auto pb-20 md:pb-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="pb-6" style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center">
                  <span className="mr-3" style={{ color: 'var(--color-text)' }}>&gt;</span>

                  <DecryptedText
                    text="PING ME"
                    speed={15}
                    maxIterations={100}
                    characters="01010101001100010"
                    className=""
                    parentClassName="all-letters"
                    encryptedClassName=""
                    animateOn="view"
                    revealDirection="start"
                  />

                  <span className="animate-pulse ml-3 inline-block w-3 h-8 align-middle"
                    style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></span>
                </h1>
                <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  // System ready for incoming transmission.
                  <br />
                  // Awaiting user input protocol...
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email */}
                <div className="group flex items-center gap-5 p-4 transition-all duration-300 relative"
                  style={{ border: '1px solid var(--color-border)' }}>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors"
                    style={{ borderColor: 'transparent' }}></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors"
                    style={{ borderColor: 'transparent' }}></div>

                  <div className="p-3" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)', color: 'var(--color-primary)' }}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[ TARGET.EMAIL ]</p>
                    <a href="mailto:srinivasan.mmca@gmail.com" className="font-bold text-sm md:text-base hover:underline"
                      style={{ color: 'var(--color-primary)' }}>
                      srinivasan.mmca@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-center gap-5 p-4 transition-all duration-300 relative"
                  style={{ border: '1px solid var(--color-border)' }}>
                  <div className="p-3" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)', color: 'var(--color-primary)' }}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[ TARGET.PHONE ]</p>
                    <p className="font-bold text-sm md:text-base" style={{ color: 'var(--color-primary)' }}>9003237665</p>
                  </div>
                </div>

                {/* Location */}
                <div className="group flex items-center gap-5 p-4 transition-all duration-300 relative"
                  style={{ border: '1px solid var(--color-border)' }}>
                  <div className="p-3" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)', color: 'var(--color-primary)' }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>[ TARGET.LOC ]</p>
                    <p className="font-bold text-sm md:text-base" style={{ color: 'var(--color-primary)' }}>Chennai, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-6 md:p-8 relative"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 0 50px -10px color-mix(in srgb, var(--color-primary) 10%, transparent)'
              }}>
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                <div className="h-full w-1/3" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 50%, transparent)' }}></div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Name */}
                <div className="space-y-2 group">
                  <label htmlFor="fullname" className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: 'var(--color-text-muted)' }}>
                    &gt; Enter_User_ID
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="RAJINI_KANTH"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full py-2 md:py-3 pl-12 pr-4 font-mono text-sm focus:outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-primary)'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: 'var(--color-text-muted)' }}>
                    &gt; Enter_Source_Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="user@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-2 md:py-3 pl-12 pr-4 font-mono text-sm focus:outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-primary)'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2 group">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: 'var(--color-text-muted)' }}>
                    &gt; Enter_Subject_Line
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Project_Inquiry_V1"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full py-2 md:py-3 pl-12 pr-4 font-mono text-sm focus:outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: 'var(--color-text-muted)' }}>
                    &gt; Enter_Message_Body
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Input message data..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-3 px-4 h-24 md:h-32 resize-none font-mono text-sm focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-primary)'
                    }}
                    required
                  ></textarea>
                </div>

                {/* Status */}
                {status.type && (
                  <div className="flex items-center gap-3 p-4"
                    style={{
                      border: `1px solid ${status.type === 'success' ? 'var(--color-primary)' : status.type === 'error' ? '#ef4444' : 'var(--color-border)'}`,
                      backgroundColor: status.type === 'success' ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)' : status.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                      color: status.type === 'success' ? 'var(--color-primary)' : status.type === 'error' ? '#ef4444' : 'var(--color-text)'
                    }}>
                    {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
                    {status.type === 'error' && <XCircle className="w-5 h-5" />}
                    {status.type === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className={`w-full font-bold py-3 md:py-4 transition-all duration-300 flex items-center justify-center gap-3 group uppercase tracking-widest text-sm md:text-base ${status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    backgroundColor: 'transparent'
                  }}
                >
                  {status.type === 'loading' ? '[ TRANSMITTING... ]' : '[ EXECUTE_TRANSMISSION ]'}
                  <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;