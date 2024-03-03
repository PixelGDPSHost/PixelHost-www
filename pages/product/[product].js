import { useRouter } from 'next/router'
export default function ProductInfo() {
    const router = useRouter()
    return <p>{router.query.product}</p>
}