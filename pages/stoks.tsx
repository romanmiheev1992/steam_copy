import axios from "axios"
import { GetStaticProps } from "next"
import { Link } from "../helpers/links"
import { MenuInterface, TechnologiesInterface } from "../interfaces/interfaces"
import { withLayout } from "../Layout/Layout"
import { StoсksPage } from "../components/StoсksPage/StoсksPage"
import { ImageHeader } from "../components"

 const Stoks = ({menu, stocks, header}:StoksProps ): JSX.Element=> {

    return (
        <>
          <ImageHeader/>
          <StoсksPage/>
        </>
    )
}

export default withLayout(Stoks)
export const getStaticProps: GetStaticProps = async () => {
    const {data: menu} = await axios.get<MenuInterface[]>(Link.menu)
    const {data: stocks} = await axios.get<TechnologiesInterface[]>(Link.stocks)
    const {data: header} = await axios.get<string>(Link.mainImage)
    return {
      props: {
        menu,
        stocks,
        header
      }
    }
  }
  
  export interface StoksProps extends Record<string, unknown> {
    menu: MenuInterface[],
    stocks: TechnologiesInterface[],
    header: string
  }
  
  
  
  