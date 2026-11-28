
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { DirectionProvider } from "@base-ui/react/direction-provider";

function Slider({
  className,
  direction = "ltr",
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const values = Array.isArray(value)
    ? value
    : value !== undefined
      ? [value]
      : Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue !== undefined
          ? [defaultValue]
          : [min];

  return (
    <DirectionProvider direction={direction}>
      <SliderPrimitive.Root
        dir={direction}
        data-slot="slider"
        data-direction={direction}
        className={utils.cn("slider", className)}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        thumbAlignment="edge"
        {...props}
      >
        <SliderPrimitive.Control className="slider-control">
          <SliderPrimitive.Track
            data-slot="slider-track"
            className="slider-track"
          >
            <SliderPrimitive.Indicator
              data-slot="slider-range"
              className="slider-range"
            />

            {values.map((_, index) => (
              <SliderPrimitive.Thumb
                key={index}
                data-slot="slider-thumb"
                className="slider-thumb"
              />
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </DirectionProvider>
  );
}

export {
  Slider,
};
