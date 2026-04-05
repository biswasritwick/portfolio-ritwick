import { FormBlockContent as FormBlockContentProps } from '@/payload-types'
import './style.css'

import RichText from '@/components/RichText'

export const FormBlockContent: React.FC<FormBlockContentProps> = ({ forms }) => {
  return (
    <div className="hero-section relative w-full h-screen" id="herosection">
      {forms && <RichText data={forms} />}
    </div>
  )
}
