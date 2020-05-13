import { prop, getModelForClass, arrayProp } from '@typegoose/typegoose'
import { omit } from 'lodash'

class LocalizationVariant {
  @prop()
  username?: string
  @prop({ required: true })
  language: string
  @prop({ required: true })
  text: string
  @prop({ required: true, default: false })
  selected: boolean
}

export class Localization {
  @prop({ index: true, required: true })
  key: string
  @arrayProp({ items: String, default: [] })
  tags: string[]
  @arrayProp({ items: LocalizationVariant, default: [] })
  variants: LocalizationVariant[]

  stripped() {
    const stripFields = ['createdAt', 'updatedAt', '__v']
    return omit(this._doc, stripFields)
  }

  // Mongo property
  _doc: any
}

export const LocalizationModel = getModelForClass(Localization, {
  schemaOptions: { timestamps: true },
})
