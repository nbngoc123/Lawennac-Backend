import { Runware } from "@runware/sdk-js";
const runware = new Runware({ apiKey: "2GhOrftvZs5pnfbFUWWAflPBpS3msW2n" });

export async function generateImage(
    positivePrompt, // Required
    negativePrompt = "",  // Optional (defaults to empty string)
    model,          // Required 
    width = 512,     // Optional (defaults to 512)
    height = 512,    // Optional (defaults to 512)
    numberResults = 1, // Optional (defaults to 1)
    steps = 25,       // Optional (defaults to 25)
    guidanceScale = 7.5, // Optional (defaults to 7.5)
    scheduler = "DPM++ 2M Karras", // Optional (defaults to "DPM++ 2M Karras")
    clipSkip = 0,    // Optional (defaults to 0)
    controlNet = [], // Optional (defaults to an empty array)
    lora = []        // Optional (defaults to an empty array)
) {
    try {
        const images = await runware.requestImages({
            positivePrompt: positivePrompt,
            negativePrompt: negativePrompt,
            width: width,
            height: height,
            model: model,
            numberResults: numberResults,
            steps: steps,
            guidanceScale: guidanceScale,
            scheduler: scheduler,
            seed, // Include seed only if provided
            // clipSkip: clipSkip,
            // controlNet: controlNet.map(control => ({
            //     model: control.model,      // Required
            //     guideImage: control.guideImage, // Required
            //     weight: control.weight || 1.0 // Optional (defaults to 1.0)
            // })),
            lora: lora.map(loraItem => ({
                model: loraItem.model,   // Required
                weight: loraItem.weight || 0.5 // Optional (defaults to 0.5)
            }))
        });

        return images; 
    } catch (error) {
        console.error("Error generating image:", error);
    }
}
