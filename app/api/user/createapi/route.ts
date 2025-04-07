import { NextRequest, NextResponse } from 'next/server'
import client from '@/db/index'
import { faker } from '@faker-js/faker'
import { Field } from '@/utilite/type'
import checklogin from '@/action/checklogin/checklogin'
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest) {
  const login = await checklogin()

  if (!login) {
    redirect('/start')
  }

  const createdById = Number(login.id)

  try {
    const { fields, count, title } = await request.json()
    const generatedData: Array<Record<string, string | number | boolean | null>> = []

    for (let i = 0; i < count; i++) {
      const entry: Record<string, string | number | boolean | null> = {}
      fields.forEach((field: Field) => {
        switch (field.type) {
          case 'string':
            entry[field.name] = faker.lorem.words(1)
            break
          case 'number':
            entry[field.name] = Math.floor(Math.random() * 100)
            break
          case 'boolean':
            entry[field.name] = faker.datatype.boolean()
            break
          default:
            entry[field.name] = null
        }
      })
      generatedData.push(entry)
    }

    const createdData = await client.customapi.create({
      data: {
        title: title,
        fields: generatedData,
        sampleSize: count,
        createdById,
      },
    })

    return NextResponse.json({ success: true, data: createdData })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 })
  } finally {
    await client.$disconnect()
  }
}
