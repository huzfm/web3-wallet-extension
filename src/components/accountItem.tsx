type Props = {
      index: string
      address: string
}

export function AccountItem({ index, address }: Props) {
      return (
            <>
                  <div>
                        {index + 1} : {address}
                  </div>
            </>
      )
}
