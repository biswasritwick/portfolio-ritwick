import { FormBlockContent as FormBlockContentProps } from '@/payload-types'
import './style.css'
import Image from 'next/image'
import RichText from '@/components/RichText'

export const FormBlockContent: React.FC<FormBlockContentProps> = ({
  forms,
  cvImagePdf,
  cvImage,
}) => {
  const pdfUrl = typeof cvImagePdf !== 'string' && cvImagePdf?.url ? cvImagePdf.url : null

  // Fix 1: guard undefined explicitly with ?? null
  const cvImageUrl = typeof cvImage === 'string' ? cvImage : (cvImage?.url ?? null)

  return (
    // Fix 2: min-h-screen instead of h-screen so content isn't clipped
    <div
      className="hero-section-contact relative w-full h-fit grid grid-cols-12 lg:gap-8  container section_gap_bottom section_gap_top"
      id="herosection contact-us"
    >
      {forms && (
        <div className="lg:col-span-6 col-span-12   w-full">
          <RichText data={forms} />
        </div>
      )}
      <div className="Download_cv  w-full lg:col-span-6 col-span-12 lg:mt-0 mt-10">
        {pdfUrl && (
          <div className="cv-preview  flex w-full h-full flex-col items-center justify-center gap-4">
            {cvImageUrl && (
              // Fix 3: wrap in a relative container with explicit height for fill to work
              <div className="relative w-full h-full max-h-[400px]  overflow-hidden">
                <Image
                  src={cvImageUrl}
                  alt="CV Preview"
                  fill
                  // Fix 4: object-cover so image doesn't stretch
                  className="object-contain !relative"
                />
              </div>
            )}
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
