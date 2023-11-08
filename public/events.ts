// refactoring: needed (migrate to slices)

export interface TimelineEvent {
    id: number
    date: string
    julianDate: number
    name: string
    description: string
    timelineInfo?: {id: number, name: string}[]
    overlap?: number
    depth?: number
    distance?: number
    animation?: string
    isToggle?: boolean
    toggleEvents?: any[]
    order?: number
    top?: number
    boxTop?: number
    fadeout?: boolean
    prev?: boolean
    blank?: boolean
    new?: boolean
}

export interface ReferEvent extends TimelineEvent {
    top: number
    order: number
    boxTop: number
}