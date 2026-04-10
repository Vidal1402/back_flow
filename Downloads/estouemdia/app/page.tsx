import { Hero } from "@/components/estou-em-dia/hero"
import { Benefits } from "@/components/estou-em-dia/benefits"
import { Process } from "@/components/estou-em-dia/process"
import { Legal } from "@/components/estou-em-dia/legal"
import { Consultoria } from "@/components/estou-em-dia/consultoria"
import { Protege } from "@/components/estou-em-dia/protege"
import { Garantia } from "@/components/estou-em-dia/garantia"
import { Contato } from "@/components/estou-em-dia/contato"
import { Footer } from "@/components/estou-em-dia/footer"

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full min-w-0 max-w-[100vw] overflow-x-clip text-center md:text-left">
      <Hero />
      <Benefits />
      <Process />
      <Legal />
      <Consultoria />
      <Protege />
      <Garantia />
      <Contato />
      <Footer />
    </main>
  )
}
