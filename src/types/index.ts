import type { ReactNode } from 'react'

export interface NavItem {
  label: string
  href: string
}

export interface StatItem {
  id: string
  targetNumber: number
  suffix: string
  prefix?: string
  label: string
  description?: string
}

export interface CommunityImageItem {
  id: string
  url: string
  name: string
  role: string
  alt: string
  shape: 'circle' | 'rounded' | 'portrait'
}

export interface FloatingCardData {
  id: string
  title: string
  subtitle: string
  icon: ReactNode
  badgeText?: string
  positionClasses: string
  delay: number
  floatDuration?: number
}

export interface FloatingBubbleData {
  id: string
  type: 'image' | 'label' | 'particle'
  label?: string
  imageId?: string
  iconName?: string
  variant: 'circle' | 'blob' | 'portrait' | 'pill' | 'ring' | 'star' | 'dot' | 'spark'
  finalPosition: { x: number; y: number }
  burstDelay: number
  burstDuration: number
  floatOffset: { x: number; y: number }
  floatDuration: number
  hideOnMobile?: boolean
  transient?: boolean
}
