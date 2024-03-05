import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w- full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the difference between this and generating from GPT?</AccordionTrigger>
          <AccordionContent>
            Nothing really, this was created simply for me to get better at my development skills and learn how to utilize AI in a web-app.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I switch the art style?</AccordionTrigger>
          <AccordionContent>
            After you type your prompt, put a comma and you can write 'photographic', 'photorealistic', 'cartoon', + other tags that can be used for a specific style
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are more features going to come out?</AccordionTrigger>
          <AccordionContent>
            Yes, I'm going to be updating this everytime I learn more about AI image modification using code.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  