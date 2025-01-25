import localFont from "next/font/local";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

export const Contact: FC = (): ReactElement => (
  <section className="scroll-mt-[88px] bg-white pt-24" id="contact">
    <div className="container mx-auto flex justify-center gap-5 px-5">
      <div className="space-y-5">
        <div className="w-full max-w-[600px] space-y-5">
          <p className="-mb-2 font-semibold tracking-wider text-rose-500">CONTACT US</p>
          <h2 className={`text-6xl ${montaguSlab.className}`}>Get in touch</h2>
          <p>
            Feel free to reach out to us for any inquiries or bookings. We&apos;re here to provide you with exceptional service and ensure your
            special moments are unforgettable. Let’s get in touch and create something beautiful together.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-rose-200 text-rose-500 hover:bg-rose-300 hover:text-rose-600 active:scale-95 active:bg-rose-100 active:text-rose-400"
            href={"https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKhbqXwZZlCGblTvnSbqqVScKFDqJfllGdJbTKMLRgGBvTbLsrZdPLRtZDfHVQzxnvVTfTq"}
            target="_blank"
          >
            <MdEmail className="-mr-px" size={25} />
          </Link>

          <Link
            className="-mt-0.5 inline-block text-2xl font-semibold text-rose-500 hover:text-rose-600 active:scale-95 active:text-rose-400"
            href={"https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKhbqXwZZlCGblTvnSbqqVScKFDqJfllGdJbTKMLRgGBvTbLsrZdPLRtZDfHVQzxnvVTfTq"}
            target="_blank"
          >
            HastinulcMakeupArt@gmail.com
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-rose-200 text-rose-500 hover:bg-rose-300 hover:text-rose-600 active:scale-95 active:bg-rose-100 active:text-rose-400"
            href={"https://maps.app.goo.gl/ZzjRDTfPCRsXefUi7"}
            target="_blank"
          >
            <FaLocationDot className="-mr-px" size={25} />
          </Link>

          <Link
            className="-mt-0.5 inline-block text-2xl font-semibold text-rose-500 hover:text-rose-600 active:scale-95 active:text-rose-400"
            href={"https://maps.app.goo.gl/ZzjRDTfPCRsXefUi7"}
            target="_blank"
          >
            Padang, Padang City, West Sumatra
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-rose-200 text-rose-500 hover:bg-rose-300 hover:text-rose-600 active:scale-95 active:bg-rose-100 active:text-rose-400"
            href={"https://wa.me/6285762346703"}
            target="_blank"
          >
            <IoLogoWhatsapp className="-mr-px" size={25} />
          </Link>

          <Link
            className="-mt-0.5 inline-block text-2xl font-semibold text-rose-500 hover:text-rose-600 active:scale-95 active:text-rose-400"
            href={"https://wa.me/6285762346703"}
            target="_blank"
          >
            (085) 7623-4670-3
          </Link>
        </div>
      </div>

      <iframe
        className="rounded-lg border-2 border-rose-200 shadow-md"
        height={500}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127657.2018081007!2d100.23537600480148!3d-0.9345801412152906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b942e2b117bb%3A0xb8468cb5c3046ba5!2sPadang%2C%20Padang%20City%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1737091168673!5m2!1sen!2sid"
        title="Google Maps"
        width={1000}
      />
    </div>
  </section>
);
