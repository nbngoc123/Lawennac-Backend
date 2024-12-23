import { runware } from '../config/RunWare.js';
export async function generateImage(
    positivePrompt, // Required
    negativePrompt = "",  // Optional (defaults to empty string)
    model,          // Required
    width = 512,     // Optional (defaults to 512)
    height = 512,    // Optional (defaults to 512)
    numberResults = 1, // Optional (defaults to 1)
    steps,       // Optional
    guidanceScale, // Optional
    scheduler, // Optional
    clipSkip,    // Optional
    controlNet = [], // Optional (defaults to an empty array)
    lora = [],       // Optional (defaults to an empty array)
    seed,
    seedImage            // Optional
) {
    try {
        // Prepare the payload for requestImages
        const payload = {
            positivePrompt,
            negativePrompt,
            width,
            height,
            model,
            numberResults
        };

        // Conditionally add optional parameters
        if (seed !== undefined) payload.seed = seed;
        if (seedImage !== undefined) payload.seedImage = seedImage;
        if (scheduler !== undefined) payload.scheduler = scheduler;
        if (steps !== undefined) payload.steps = steps;
        if (guidanceScale !== undefined) payload.CFGScale = guidanceScale;
        if (clipSkip !== undefined) payload.clipSkip = clipSkip;

        // Handle controlNet if provided
        if (controlNet.length > 0) {
            payload.controlNet = controlNet.map(control => ({
                model: control.model, // Required
                guideImage: control.guideImage, // Required
                weight: control.weight || 1.0, // Optional (default 1.0)
                startStep: control.startStep, // Optional
                startStepPercentage: control.startStepPercentage, // Optional
                endStep: control.endStep, // Optional
                endStepPercentage: control.endStepPercentage, // Optional
                controlMode: control.controlMode // Optional (prompt, controlnet, balanced)
            })).filter(control => control.model && control.guideImage); // Ensure required fields are present
        }

        // Handle lora if provided
        if (lora.length > 0) {
            payload.lora = lora.map(loraItem => ({
                model: loraItem.model, // Required
                weight: loraItem.weight || 0.5 // Optional (default 0.5)
            }));
        }

        const images = await runware.requestImages(payload);
        return images; 
    } catch (error) {
        console.error("Error generating image:", error);
        throw error; // Rethrow error for better error handling
    }
}
