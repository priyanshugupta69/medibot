import React from 'react';
import Footer from './footer';
const About = () => {
  return (
    <div className="container mx-auto p-10 md:p-32 pt-20 lg:pt-32 py-10 text-justify">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <div className="space-y-6">
        <section>
          <p className="">
            With Huego.Ai at your fingertips, let&apos;s disrupt the sick care system with the power of AI. Huego is powered by clinical vignettes, which typically involve a brief description of a patient&apos;s medical history, symptoms, and physical exam findings to illustrate a particular medical condition or situation. This can be useful in medical education and training, as well as in clinical assessments and decision-making.
          </p>
        </section>
        <section>
          <p className="">
            Clinical vignettes can come in different forms and may focus on various aspects of patient care, such as diagnostic evaluation, treatment options, management strategies, ethical considerations, or communication skills. They may also vary in complexity and scope, depending on the intended audience and purpose.
          </p>
        </section>
        <section>
          <p className="">
            Overall, clinical vignettes can provide valuable insights and opportunities for learning and reflection in medical practice.
          </p>
        </section>
        <section>
          <p className='font-semibold'>
            &ldquo;In every act of care, we sow the seeds of hope and compassion , let’s make access to healthcare ubiquitous.&rdquo; - <br />
            {/* <p className='mt-2 font-normal'> */}
            <span className='font-normal'>Dr. Tanner Ahmed</span><br />
            <span className='font-normal'>Creator, Huego.ai</span><br />
            <span className='font-normal'>Cofounder, Bumblebee Labs Inc</span><br />
            {/* </p> */}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;