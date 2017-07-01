export type IGImage = {
  id?: string
  images?:{
      thumbnail:{
          width: number
          height: number
          url: string
      }
  }
  link:string
}