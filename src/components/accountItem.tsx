type Props = {
      index: string
      address: string
}
export function AccountItem({ index, address }: Props) {
      return (
            <div className="text-xs bg-gray-50 p-2 rounded-lg break-all">
                  {index + 1} : {address}
            </div>
      )
}
