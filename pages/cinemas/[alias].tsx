import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import { Link } from "../../helpers/links"
import { CinemaListsInterfase, FilmListInterface, MenuInterface } from "../../interfaces/interfaces"
import { withLayout } from "../../Layout/Layout"
import {CinemaSection, ImageHeader} from '../../components'

const CinemaPage = ({menu, cinemas, header, filmList}: CinemasPageProps): JSX.Element => {
    return (
        <>
            <ImageHeader/>  
            <CinemaSection/>
        </>
    )
}

export default withLayout(CinemaPage)

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = []
  const {data: cinemas} = await axios.get<CinemaListsInterfase[]>(Link.cinemas)
  cinemas.map(cinema => paths.push(`/cinemas/${cinema.alias}`))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CinemasPageProps> = async () => {

    const {data: menu} = await axios.get<MenuInterface[]>(Link.menu)
    const {data: header} = await axios.get<string>(Link.mainImage)
    const {data: cinemas} = await axios.get<CinemaListsInterfase[]>(Link.cinemas)
    const {data: filmList} = await axios.get<FilmListInterface[]>(Link.filmList)
    return {
        props: {
            menu,
            cinemas,
            header,
            filmList,
        }
    }
}

export interface CinemasPageProps extends Record<string, unknown> {
    menu: MenuInterface[],
    cinemas: CinemaListsInterfase[],
    header: string,
    filmList: FilmListInterface[],
}
  
  