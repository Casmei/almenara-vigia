import HtmlGenerator from "../infra/files";
import ImageGenerator from "../infra/puppeteer";
import { dirname, resolve } from "path";
import type BaseUseCaseInterface from "./base-use-case.interface";

/**
 * Abstract base class for use cases that generate HTML and images.
 *
 * Subclasses must implement the abstract methods to provide specific behavior.
 */
export default abstract class BaseUseCase<RawData = any, ProcessedData = any>
  implements BaseUseCaseInterface
{
  protected outputBaseName: string = "output";
  protected outputDirectory: string = resolve(__dirname, "../../dist/html");
  protected imagesDirectory: string = resolve(__dirname, "../../dist/images");
  protected currentYear: number;
  protected currentMonth: number;
  constructor() {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1;
  }

  /**
   * Fetches the necessary data for the use case.
   * Must be implemented by concrete subclasses.
   *
   * @returns The raw data needed for processing
   */
  protected abstract fetchData(): Promise<RawData>;

  /**
   * Processes the raw data into a structured format.
   * Must be implemented by concrete subclasses.
   *
   * @returns The processed data ready for HTML generation
   */
  protected abstract processData(rawData: RawData): Promise<ProcessedData>;

  /**
   * Generates HTML content from the processed data.
   * Must be implemented by concrete subclasses.
   *
   * @param processedData The data to render into HTML
   * @returns Generated HTML string
   */
  protected abstract generateHtmlContent(processedData: ProcessedData): string;

  /**
   * Saves the generated HTML to a file
   *
   * @param htmlContent The HTML content to save
   * @param fileName Optional custom filename (without extension)
   */
  protected async saveHtmlFile(
    htmlContent: string,
    fileName?: string,
  ): Promise<void> {
    const outputFile = fileName || this.outputBaseName;
    await new HtmlGenerator().handle(htmlContent, {
      fileName: outputFile,
    });
  }

  /**
   * Generates an image from the HTML content
   *
   * @param fileName Optional custom filename (without extension)
   */
  protected async generateImageFile(fileName?: string): Promise<void> {
    const outputFile = fileName || this.outputBaseName;
    const htmlFile = `${outputFile}.html`;

    await new ImageGenerator().handle(htmlFile, {
      outputName: outputFile,
    });
  }

  /**
   * The main execution method for the use case.
   * Implements the template method pattern.
   *
   * Subclasses can override this but should call super.handle()
   * to maintain the standard workflow.
   */
  public async handle(): Promise<void> {
    try {
      const rawData = await this.fetchData();
      const processedData = await this.processData(rawData);
      const htmlContent = this.generateHtmlContent(processedData);
      await this.saveHtmlFile(htmlContent);
      await this.generateImageFile();
    } catch (error) {
      console.error(`Error in BaseUseCase execution: ${error}`);
      throw error;
    }
  }
}
