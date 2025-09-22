import { type SchemaTypeDefinition } from 'sanity'

// Blog şemaları
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'

// Web sitesi şemaları
import { sliderType } from './sliderType'
import { backgroundTextType } from './backgroundTextType'
import { secondSectionType } from './secondSectionType'
import { productType } from './productType'
import { backgroundImageType } from './backgroundImageType'
import { pdfSettingsType } from './pdfSettingsType'
import { videoSettingsType } from './videoSettingsType'
import { blogSettingsType } from './blogSettingsType'
import { menuType } from './menuType'
import { logoType } from './logoType'
import { productBarType } from './productBarType'
import { footerType } from './footerType'
import { certificateType } from './certificateType'
import { milestoneType } from './milestoneType'
import { documentType } from './documentType'
import { corporateIdentityType } from './corporateIdentityType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog şemaları
    blockContentType, 
    categoryType, 
    postType, 
    authorType,
    // Web sitesi şemaları
    sliderType,
    backgroundTextType,
    secondSectionType,
    productType,
    backgroundImageType,
    pdfSettingsType,
    videoSettingsType,
    blogSettingsType,
    menuType,
    logoType,
    productBarType,
    footerType,
    certificateType,
    milestoneType,
    documentType,
    corporateIdentityType,
  ],
}
