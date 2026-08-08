import type { StatItem, FloatingBubbleData } from '../types'
export { communityImages } from './communityImages'

/**
 * CENTRAL SHEBUILDS DATA CONFIGURATION
 * 
 * To replace temporary stock images with official SheBuilds photos or updated statistics:
 * Edit the values in this file! Component code will automatically reflect these updates.
 */

export const heroConfig = {
  pillLabel: "● CHENNAI · BUILDING TOGETHER",
  headlineMain: "Where Women",
  headlineAccent: "Build What's Next.",
  description: "A community for women who code, create, lead, experiment, and build what's next.",
  primaryCTA: "Join the Community",
  secondaryCTA: "See What We're Building",
}

export const heroStats: StatItem[] = [
  {
    id: "members",
    targetNumber: 12000,
    suffix: "K+",
    label: "Community Members",
    description: "Women coders, founders & creators across Chennai"
  },
  {
    id: "events",
    targetNumber: 500,
    suffix: "+",
    label: "Events & Experiences",
    description: "Hackathons, labs, bootcamps & tech meetups"
  },
  {
    id: "mentors",
    targetNumber: 70,
    suffix: "+",
    label: "Mentors & Leaders",
    description: "Senior engineers, CTOs & venture founders"
  },
  {
    id: "founded",
    targetNumber: 2024,
    suffix: "",
    label: "Founded in Chennai",
    description: "Empowering women-led tech innovation"
  }
]

/**
 * Emerging floating bubbles originating from central SheBuilds hub.
 */
export const floatingBubblesData: FloatingBubbleData[] = [
  {
    id: "burst-builder",
    type: "image",
    label: "Builder",
    imageId: "woman-coding",
    variant: "circle",
    finalPosition: { x: -250, y: -140 },
    burstDelay: 0.1,
    burstDuration: 0.55,
    floatOffset: { x: -8, y: 10 },
    floatDuration: 7.2,
  },
  {
    id: "burst-mentor",
    type: "label",
    label: "Mentor",
    variant: "pill",
    finalPosition: { x: 260, y: -170 },
    burstDelay: 0.18,
    burstDuration: 0.58,
    floatOffset: { x: 6, y: -10 },
    floatDuration: 6.8,
  },
  {
    id: "burst-founder",
    type: "image",
    label: "Founder",
    imageId: "woman-leader",
    variant: "blob",
    finalPosition: { x: -300, y: 80 },
    burstDelay: 0.26,
    burstDuration: 0.6,
    floatOffset: { x: -4, y: 12 },
    floatDuration: 8.1,
  },
  {
    id: "burst-speaker",
    type: "image",
    label: "Speaker",
    imageId: "woman-speaker",
    variant: "portrait",
    finalPosition: { x: 310, y: 90 },
    burstDelay: 0.34,
    burstDuration: 0.62,
    floatOffset: { x: 8, y: 6 },
    floatDuration: 7.5,
    hideOnMobile: true,
  },
  {
    id: "burst-creator",
    type: "label",
    label: "Creator",
    variant: "ring",
    finalPosition: { x: -190, y: 230 },
    burstDelay: 0.42,
    burstDuration: 0.62,
    floatOffset: { x: -6, y: 10 },
    floatDuration: 7.8,
  },
  {
    id: "burst-community",
    type: "label",
    label: "Community",
    variant: "star",
    finalPosition: { x: 170, y: 220 },
    burstDelay: 0.5,
    burstDuration: 0.64,
    floatOffset: { x: 6, y: -8 },
    floatDuration: 6.9,
  },
  {
    id: "burst-technology",
    type: "particle",
    variant: "ring",
    finalPosition: { x: 360, y: -20 },
    burstDelay: 0.58,
    burstDuration: 0.52,
    floatOffset: { x: 0, y: -8 },
    floatDuration: 6.2,
    hideOnMobile: true,
    transient: true,
  },
  {
    id: "burst-inspiration",
    type: "particle",
    variant: "spark",
    finalPosition: { x: -70, y: -240 },
    burstDelay: 0.62,
    burstDuration: 0.5,
    floatOffset: { x: 0, y: 0 },
    floatDuration: 0,
    hideOnMobile: true,
    transient: true,
  },
  {
    id: "burst-dot-a",
    type: "particle",
    variant: "dot",
    finalPosition: { x: 240, y: 240 },
    burstDelay: 0.46,
    burstDuration: 0.5,
    floatOffset: { x: 0, y: 0 },
    floatDuration: 0,
    hideOnMobile: true,
    transient: true,
  },
  {
    id: "burst-dot-b",
    type: "particle",
    variant: "dot",
    finalPosition: { x: -340, y: 20 },
    burstDelay: 0.37,
    burstDuration: 0.56,
    floatOffset: { x: -4, y: 4 },
    floatDuration: 6.6,
    hideOnMobile: true,
  }
]

export const ecosystemJourney = [
  "LEARN",
  "BUILD",
  "CONNECT",
  "LEAD"
]
