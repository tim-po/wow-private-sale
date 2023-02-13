import React, {  useEffect, useRef,useState } from "react";
import "./index.scss";
import { PresetType } from "../../types";
import * as Scroll from "react-scroll";
import { useNavigate, useSearchParams } from "react-router-dom";
import Preset from "../Preset";
import Illustration from "images/icons/illustration";
import Chevron, { Turn } from "../../images/icons/chevron";
import Magnifier from "../../images/icons/magnifier";

type SelectedPresetsPropType = {
  selectedPresets: PresetType[];
  deletePreset?: (presetId: string) => void;
  isHidden: boolean;
  hintEditPresets?: React.RefObject<HTMLButtonElement>;
};


const SelectedPresetsDefaultProps = {};

const SelectedPresets = (props: SelectedPresetsPropType) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedPresets, deletePreset, isHidden, hintEditPresets } = props;
  const [leftScrollPosition, setLeftScrollPosition] = useState(0);
  const [isRightArrowHidden, setIsRightArrowHidden] = useState(false);
  const presetWindowSize = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const carousel: Element | null = document.querySelector(".leftSlide");
    if (carousel) {
      const container: Element | null = document.querySelector(".selectedPresetsContainer");
      let sumOfCarouselCards = 0;
      setTimeout(() => {
        carousel.querySelectorAll(".leftSlide > .preset").forEach((elem) => {
          sumOfCarouselCards = sumOfCarouselCards + elem.clientWidth;
          if (container) {
            setIsRightArrowHidden(sumOfCarouselCards > container.clientWidth);
          }
        });
      }, 200);
    }
  }, [selectedPresets]);

  useEffect(() => {
    let scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  }, []);

  const shouldDrawScrollButton = (event: React.SyntheticEvent<HTMLDivElement> | React.UIEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    setLeftScrollPosition(element.scrollLeft);

    if (!element) {
      // element.classList.remove("hidden-right");
      // element.classList.remove("hidden-left");
      return;
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
      element.classList.add("hidden-right");
      return;
    }

    if (element.scrollLeft <= 10) {
      element.classList.add("hidden-left");
      return;
    }

    element.classList.remove("hidden-left");
    element.classList.remove("hidden-right");
  };
  const scrollToRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLElement;
    if (presetWindowSize.current)
      parentNode.scrollLeft += Math.min(
        parentNode.clientWidth,
        presetWindowSize?.current?.getBoundingClientRect().width
      );
  };
  const scrollToLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLElement;
    if (presetWindowSize.current)
      parentNode.scrollLeft -= Math.min(
        parentNode.clientWidth,
        presetWindowSize?.current?.getBoundingClientRect().width
      );
  };
  const editSkillSets = () => {
    navigate(`professionDetails?id=${searchParams.get("id")}&view=skills`);
  };

  return (
    <div className="selectedPresetsContainer">
      <div
        className={`leftSlide ${isHidden ? "hidden" : ""} ${
          !isRightArrowHidden ? "hidden-right" : ""
        }`}
        onLoad={(e) => shouldDrawScrollButton(e)}
        onScroll={(e) => shouldDrawScrollButton(e)}
      >
        <button className="scrollBtn right" onClick={scrollToRight}>
          <span style={{ pointerEvents: "none" }}>
            <Chevron color={undefined}/>
          </span>
        </button>
        <button
          className="scrollBtn left"
          style={{ opacity: leftScrollPosition ? 1 : 0 }}
          onClick={scrollToLeft}
        >
          <span style={{ pointerEvents: "none" }}>
            <Chevron turn={Turn.left} />
          </span>
        </button>
        {selectedPresets.length === 0 &&
          searchParams.get("view") !== "main" && (
            <div className="blockMyPreset">
              <Magnifier />
              <span>Ты не добавил ни одного набора навыков</span>
            </div>
          )}
        {selectedPresets.length === 0 &&
          searchParams.get("view") === "main" && (
            <div className="blockMyPreset main">
              <div className="imgPresets">
                <Illustration />
              </div>
              <div className="prompt">
                <span>
                  В дополнение к ключевым словам ты можешь добавить наборы
                  навыков, которые тебе интересны
                </span>
                <div className="addPreset">
                  <div style={{ width: "max-content" }}>
                    <button
                      ref={hintEditPresets}
                      onClick={editSkillSets}
                      className="add-button"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        {selectedPresets.map((preset, index) => (
          <Preset
            presetWindowSize={index === 0 ? presetWindowSize : undefined}
            key={preset.title}
            displayAdd={false}
            onClick={
              deletePreset
                ? () => {
                    deletePreset(preset.id);
                  }
                : undefined
            }
            preset={preset}
          />
        ))}
      </div>
    </div>
  );
};

SelectedPresets.defaultProps = SelectedPresetsDefaultProps;

export default SelectedPresets;
