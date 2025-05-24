import { Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import type { TouchableOpacityProps } from 'react-native'
import React, { ComponentProps }  from 'react'

type ButtonProps = ComponentProps<typeof TouchableOpacity> & {
    children: React.ReactNode
}


export default function Button({children, ...props}) {
  return (
    <Shadow>
        <TouchableOpacity {...props} ><Text>Olá mundo</Text></TouchableOpacity>
    </Shadow>
  )
}
