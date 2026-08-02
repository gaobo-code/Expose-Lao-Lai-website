"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import background from "./background.module.css";
import effects from "./effects.module.css";
import magic from "./magic.module.css";
import polish from "./polish.module.css";
import styles from "./divination.module.css";

type GameStep = "question" | "cards" | "ritual" | "result";

type Fortune = {
  level: "大吉" | "吉" | "平" | "凶" | "大凶";
  seal: string;
  verse: string;
  advice: string;
};

const FORTUNES: Fortune[] = [
  { level: "大吉", seal: "上上签", verse: "云开月明，所求遂意。此刻心中所念，正迎来最好的时机。", advice: "大胆向前，把握眼前的机会。" },
  { level: "吉", seal: "上吉签", verse: "和风入怀，渐入佳境。事情正在朝好的方向发展，不必急于求成。", advice: "保持耐心，稳稳走好下一步。" },
  { level: "平", seal: "中平签", verse: "潮来潮往，静观其变。答案尚未明朗，维持现状也是一种智慧。", advice: "暂缓决定，多观察一些细节。" },
  { level: "凶", seal: "下签", verse: "雾锁前路，进退需慎。眼下或有阻力，强行推进容易徒增消耗。", advice: "避开冲突，留待时机成熟再行动。" },
  { level: "大凶", seal: "下下签", verse: "风雨将至，宜守不宜攻。此次所问暗藏风险，退一步反而能保全自己。", advice: "停止冒进，重新审视最坏的可能。" },
];

const CARD_INDEXES = [0, 1, 2] as const;
const normalizeQuestion = (value: string) =>
  Array.from(value.replace(/\s+/g, "")).slice(0, 50).join("");

const FORTUNE_LEVEL_CLASS: Record<Fortune["level"], string> = {
  "大吉": styles.fortuneGreat,
  "吉": styles.fortuneGood,
  "平": styles.fortuneNeutral,
  "凶": styles.fortuneBad,
  "大凶": styles.fortuneWorst,
};

export default function DivinationPage() {
  const [question, setQuestion] = useState("");
  const [step, setStep] = useState<GameStep>("question");
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [chosenCard, setChosenCard] = useState<number | null>(null);
  const [cardHoverEnabled, setCardHoverEnabled] = useState(false);
  const timers = useRef<number[]>([]);
  const keyboardWasOpen = useRef(false);
  const contentRef = useRef<HTMLElement>(null);
  const contentRevealTimer = useRef<number | null>(null);
  const keyboardIsOpen = useRef(false);
  const keyboardTransitioning = useRef(false);
  const [keyboardViewport, setKeyboardViewport] = useState<{
    open: boolean;
    height: number | null;
    normalHeight: number | null;
  }>({ open: false, height: null, normalHeight: null });
  const canUseSoftKeyboard = () =>
    navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches;

  const hideContentBeforeKeyboard = () => {
    if (!canUseSoftKeyboard()) return;
    keyboardTransitioning.current = true;
    contentRef.current?.classList.add(styles.contentHidden);
    if (contentRevealTimer.current !== null) {
      window.clearTimeout(contentRevealTimer.current);
    }
    contentRevealTimer.current = window.setTimeout(() => {
      if (keyboardTransitioning.current) {
        keyboardTransitioning.current = false;
        contentRef.current?.classList.remove(styles.contentHidden);
      }
    }, 700);
  };

  useEffect(() => {
    return () => {
      timers.current.forEach(window.clearTimeout);
      if (contentRevealTimer.current !== null) {
        window.clearTimeout(contentRevealTimer.current);
      }
    };
  }, []);
  
  useEffect(() => {
    document.body.classList.add("divination-page-active");
    const scrollContainer = document.querySelector<HTMLElement>("[data-content-scroll-container]");
    if (scrollContainer) scrollContainer.scrollTop = 0;
    return () => document.body.classList.remove("divination-page-active");
  }, []);


  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    let baselineHeight = Math.max(viewport.height, window.innerHeight);
    let previousWidth = viewport.width;
    const revealContentAfterLayout = () => {
      if (contentRevealTimer.current !== null) {
        window.clearTimeout(contentRevealTimer.current);
      }
      contentRevealTimer.current = window.setTimeout(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (keyboardIsOpen.current && contentRef.current) {
              void contentRef.current.offsetHeight;
              contentRef.current.classList.remove(styles.contentHidden);
            }
          });
        });
      }, 120);
    };

    const updateKeyboardState = () => {
      const visibleHeight = viewport.height;
      let baselineChanged = false;
      if (Math.abs(viewport.width - previousWidth) > 40) {
        previousWidth = viewport.width;
        baselineHeight = Math.max(visibleHeight, window.innerHeight);
        baselineChanged = true;
      }
      const lostHeight = baselineHeight - visibleHeight;
      const keyboardOpen = lostHeight > Math.max(120, baselineHeight * 0.18);
      const hideKeyboardTransition = canUseSoftKeyboard();
      if (!keyboardOpen) baselineHeight = Math.max(baselineHeight, visibleHeight);
      const keyboardWasVisuallyOpen = keyboardIsOpen.current;
      keyboardIsOpen.current = keyboardOpen;
      if (keyboardOpen && hideKeyboardTransition) {
        keyboardTransitioning.current = false;
        contentRef.current?.classList.add(styles.contentHidden);
        revealContentAfterLayout();
      } else if (keyboardWasVisuallyOpen || !hideKeyboardTransition) {
        keyboardTransitioning.current = false;
        if (contentRevealTimer.current !== null) {
          window.clearTimeout(contentRevealTimer.current);
          contentRevealTimer.current = null;
        }
        contentRef.current?.classList.remove(styles.contentHidden);
      } else if (!keyboardTransitioning.current) {
        contentRef.current?.classList.remove(styles.contentHidden);
      }
      setKeyboardViewport((current) => {
        const nextHeight = Math.round(visibleHeight);
        const normalHeight = baselineChanged || current.normalHeight === null
          ? Math.round(baselineHeight)
          : current.normalHeight;
        if (current.open === keyboardOpen && current.height === nextHeight && current.normalHeight === normalHeight) return current;
        return { open: keyboardOpen, height: nextHeight, normalHeight };
      });
    };

    updateKeyboardState();
    viewport.addEventListener("resize", updateKeyboardState);
    viewport.addEventListener("scroll", updateKeyboardState);
    window.addEventListener("orientationchange", updateKeyboardState);
    return () => {
      viewport.removeEventListener("resize", updateKeyboardState);
      viewport.removeEventListener("scroll", updateKeyboardState);
      window.removeEventListener("orientationchange", updateKeyboardState);
    };
  }, []);

  useEffect(() => {
    if (keyboardViewport.height !== null) {
      document.body.style.setProperty("--divination-viewport-height", `${keyboardViewport.height}px`);
    }
    document.body.classList.toggle("divination-keyboard-open", keyboardViewport.open);
    return () => {
      document.body.classList.remove("divination-keyboard-open");
      document.body.style.removeProperty("--divination-viewport-height");
    };
  }, [keyboardViewport.open, keyboardViewport.height]);

  useEffect(() => {
    const justClosed = keyboardWasOpen.current && !keyboardViewport.open;
    keyboardWasOpen.current = keyboardViewport.open;
    if (!justClosed) return;

    const resetPagePosition = () => {
      const scrollContainer = document.querySelector<HTMLElement>("[data-content-scroll-container]");
      let element: HTMLElement | null = scrollContainer;
      while (element) {
        element.scrollTop = 0;
        element.scrollLeft = 0;
        element = element.parentElement;
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetPagePosition();
    const frameOne = window.requestAnimationFrame(resetPagePosition);
    const frameTwo = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resetPagePosition);
    });
    const delayedResets = [80, 180, 320].map((delay) =>
      window.setTimeout(resetPagePosition, delay)
    );

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      delayedResets.forEach(window.clearTimeout);
    };
  }, [keyboardViewport.open]);


  const chooseCard = (index: number) => {
    if (chosenCard !== null) return;

    setChosenCard(index);
    const questionSeed = [...question].reduce((sum, character) => sum + character.charCodeAt(0), 0);
    const selectedFortune = FORTUNES[(questionSeed + index * 11 + new Date().getDate()) % FORTUNES.length];

    timers.current.push(window.setTimeout(() => setStep("ritual"), 520));
    timers.current.push(window.setTimeout(() => {
      setFortune(selectedFortune);
      setStep("result");
    }, 3300));
  };

  return (
    <main
      className={`${styles.game} ${keyboardViewport.open ? styles.keyboardOpen : ""} ${magic.fontScope} ${polish.scene}`}
      style={keyboardViewport.height === null || keyboardViewport.normalHeight === null ? undefined : {
        "--visual-viewport-height": `${keyboardViewport.height}px`,
        "--normal-viewport-height": `${keyboardViewport.normalHeight}px`,
      } as CSSProperties}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={effects.aurora} aria-hidden="true" />
      <div className={magic.dust} aria-hidden="true" />
      <div className={magic.frame} aria-hidden="true" />
      <div className={polish.constellation} aria-hidden="true" />
      <div className={background.nebula} aria-hidden="true" />
      <div className={background.celestial} aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className={background.starTrails} aria-hidden="true" />
      <div className={background.fog} aria-hidden="true" />

      <Link href="/all" className={styles.back} aria-label="返回休闲馆">
        <ArrowLeft size={18} />
        <span>返回</span>
      </Link>

      <div className={`${styles.shell} ${polish.shell}`}>
        <header className={styles.header}>
          <div className={styles.kicker}><i /> ORACLE HOUSE <i /></div>
          <h1>占卜屋</h1>
          <div className={effects.sigil} aria-hidden="true"><span>✦</span><b>☾</b><span>✦</span></div>
        </header>

        <section ref={contentRef} className={styles.content}>
          {step === "question" && (
            <div className={`${styles.ask} ${polish.panel}`}>
              <div className={styles.moon} aria-hidden="true">☾<i /><i /><i /></div>
              <h2>请写下心中所问</h2>
              <p>静下心来，让思绪落在此刻最在意的事情上</p>
              <div className={styles.inputBox}>
                <textarea
                  id="question"
                  value={question}
                  className={polish.questionBox}
                  placeholder="例如：这件事会有一个好结果吗？"
                  aria-label="输入占卜问题"
                  onFocus={hideContentBeforeKeyboard}
                  onKeyDown={(event) => {
                    if ((event.key === "Enter" || event.key === " ") && !event.nativeEvent.isComposing) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    setQuestion((event.nativeEvent as InputEvent).isComposing
                      ? event.target.value
                      : normalizeQuestion(event.target.value));
                  }}
                  onCompositionEnd={(event) => setQuestion(normalizeQuestion(event.currentTarget.value))}
                />
                <span>{Array.from(question).length} / 50</span>
              </div>
              <button
                className={`${styles.goldButton} ${polish.action}`}
                disabled={!question.trim()}
                onClick={() => {
                  setCardHoverEnabled(false);
                  setStep("cards");
                }}
              >
                <Sparkles size={17} /> 开启占卜
              </button>
            </div>
          )}

          {step === "cards" && (
            <div className={`${styles.pick} ${polish.panel}`}>
              <h2>凭直觉选择一张牌</h2>
              <p>不要思考太久，第一眼的感应就是命运的回应</p>
              <div
                className={`${styles.deck} ${cardHoverEnabled ? styles.deckInteractive : ""}`}
                onPointerMove={(event) => {
                  if (event.pointerType === "mouse") setCardHoverEnabled(true);
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse") setCardHoverEnabled(true);
                }}
              >
                {CARD_INDEXES.map((index) => (
                  <button key={index} className={`${polish.card} ${chosenCard === index ? styles.chosen : ""}`} aria-label={`选择第 ${index + 1} 张神秘牌`} onClick={() => chooseCard(index)}>
                    <span className={styles.cardInner}><i>✦</i><b>☾</b><em>THE<br />ORACLE</em><i>✦</i></span>
                  </button>
                ))}
              </div>
              <small>星光已落在牌面之上</small>
            </div>
          )}

          {step === "ritual" && (
            <div className={magic.ritual} role="status" aria-live="polite">
              <div className={magic.orbStage} aria-hidden="true">
                <div className={magic.ring} /><div className={magic.ringTwo} /><div className={magic.ringThree} />
                <div className={magic.veil} />
                <div className={magic.runes}><i>✦</i><i>◇</i><i>☽</i><i>✧</i></div>
                <div className={magic.orb} />
              </div>
              <div className={magic.ritualTitle}>正在聆听星辰<span>·</span><span>·</span><span>·</span></div>
              <div className={magic.ritualSub}>命运的回响正在显现</div>
            </div>
          )}

          {step === "result" && fortune && (
            <div className={`${styles.result} ${FORTUNE_LEVEL_CLASS[fortune.level]}`}>
              <div className={`${styles.resultCard} ${polish.resultCard}`}><small>{fortune.seal}</small><strong>{fortune.level}</strong><span>✦　☾　✦</span></div>
              <div className={`${styles.reading} ${polish.reading}`}>
                <div className={styles.resultLabel}>星辰为你揭示</div>
                <h2>{fortune.level}</h2>
                <p>{fortune.verse}</p>
                <div className={styles.advice}><span>卜辞指引</span><strong>{fortune.advice}</strong></div>
              </div>
            </div>
          )}
        </section>

        <footer>占卜仅供娱乐，人生的答案始终掌握在你手中</footer>
      </div>
    </main>
  );
}
