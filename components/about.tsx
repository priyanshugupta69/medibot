import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center text-justify justify-center pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">
          With Huego.Ai at your fingertips, let&apos;s disrupt the sick care system with the power of AI. Huego is powered by clinical vignettes, which typically involve a brief description of a patient&apos;s medical history, symptoms, and physical exam findings to illustrate a particular medical condition or situation. This can be useful in medical education and training, as well as in clinical assessments and decision-making.
        </p>
        <p className="text-gray-700 mb-4">
          Clinical vignettes can come in different forms and may focus on various aspects of patient care, such as diagnostic evaluation, treatment options, management strategies, ethical considerations, or communication skills. They may also vary in complexity and scope, depending on the intended audience and purpose.
        </p>
        <p className="text-gray-700 mb-4">
          Overall, clinical vignettes can provide valuable insights and opportunities for learning and reflection in medical practice.
        </p>
        <p className='font-semibold'>
          “In every act of care, we sow the seeds of hope and compassion , let’s make access to healthcare ubiquitous.” -
          <div className='mt-2'>
            Tanner Ahmed<br />
            Founder, Huego Healthcare Inc
          </div>

        </p>
      </div>
    </div>
  );
};

export default About;