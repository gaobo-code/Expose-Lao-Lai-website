"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, Sparkles, X } from "lucide-react";
import styles from "./quiz.module.css";

type Question = { question: string; options: string[]; answer: number };
type Result = "playing" | "win" | "lose" | "draw";

const QUESTION_BANK: Question[] = [
  { question: "世界上最长的河流通常认为是？", options: ["长江", "尼罗河", "亚马孙河"], answer: 1 },
  { question: "以下哪种动物会冬眠？", options: ["松鼠", "棕熊", "长颈鹿"], answer: 1 },
  { question: "彩虹通常有几种颜色？", options: ["5 种", "6 种", "7 种"], answer: 2 },
  { question: "辽宁志在远方网络科技的厂花是谁？", options: ["白鹿", "杨紫", "姜雪"], answer: 2 },
  { question: "以下哪种动物不是鱼类？", options: ["海豚", "海马", "金枪鱼"], answer: 0 },
  { question: "一年有多少个月是31天？", options: ["6个月", "7个月", "8个月"], answer: 1 },
  { question: "王思宇的外号叫什么？", options: ["六宇", "七宇", "八宇"], answer: 2 },
  { question: "世界上面积最大的海洋是？", options: ["印度洋", "大西洋", "太平洋"], answer: 2 },
  { question: "下列哪个国家横跨欧亚两洲？", options: ["土耳其", "德国", "印度"], answer: 0 },
  { question: "王思宇常以哪个动物自居？", options: ["大象", "狐狸", "老虎"], answer: 2 },
];

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
function getWolfBattleClasses(score: number) {
  if (score >= 3) return [styles.injuryOne, styles.injuryTwo, styles.injuryThree];
  if (score === 2) return [styles.injuryOne, styles.injuryTwo];
  if (score === 1) return [styles.injuryOne];
  if (score <= -3) return [styles.celebrate, styles.prideOne, styles.prideTwo, styles.prideThree];
  if (score === -2) return [styles.celebrate, styles.prideOne, styles.prideTwo];
  if (score === -1) return [styles.prideOne];
  return [];
}

function getWolfSpeech(score: number) {
  if (score >= 3) return "眼前全是星星…";
  if (score === 2) return "有点晕了…";
  if (score === 1) return "放马过来！";
  if (score <= -3) return "哈哈，我赢定了！";
  if (score === -2) return "看我的胜利手势！";
  if (score === -1) return "这题都不会？";
  return "放马过来！";
}

export default function QuizPage() {
  const [questions, setQuestions] = useState(QUESTION_BANK);
  const stageRef = useRef<HTMLElement>(null);
  const wolfHeadRef = useRef<HTMLDivElement>(null);
  const hammerRef = useRef<HTMLDivElement>(null);
  const hammerHeadRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setQuestions(shuffle(QUESTION_BANK));
  }, []);
  useEffect(() => {
    const stage = stageRef.current;
    const wolfHead = wolfHeadRef.current;
    const hammer = hammerRef.current;
    const hammerHead = hammerHeadRef.current;
    if (!stage || !wolfHead || !hammer || !hammerHead) return;

    const alignHammerToWolfSurface = () => {
      const stageRect = stage.getBoundingClientRect();
      const headRect = wolfHead.getBoundingClientRect();
      const hammerRect = hammerHead.getBoundingClientRect();
      const currentTop = Number.parseFloat(getComputedStyle(hammer).top) || 0;
      const surfaceCorrection = headRect.top - hammerRect.bottom;
      stage.style.setProperty("--hammer-top", `${currentTop + surfaceCorrection}px`);
      stage.style.setProperty("--wolf-head-x", `${headRect.left + headRect.width / 2 - stageRect.left}px`);
      stage.style.setProperty("--wolf-head-top", `${headRect.top - stageRect.top}px`);
    };

    alignHammerToWolfSurface();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(alignHammerToWolfSurface);
    resizeObserver?.observe(stage);
    window.addEventListener("resize", alignHammerToWolfSurface);
    window.visualViewport?.addEventListener("resize", alignHammerToWolfSurface);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", alignHammerToWolfSurface);
      window.visualViewport?.removeEventListener("resize", alignHammerToWolfSurface);
    };
  }, []);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [result, setResult] = useState<Result>("playing");

  const question = questions[index];
  const progress = ((score + 3) / 6) * 100;
  const wolfBattleClasses = getWolfBattleClasses(score);

  function choose(optionIndex: number) {
    if (picked !== null || result !== "playing") return;
    const isCorrect = optionIndex === question.answer;
    const nextScore = score + (isCorrect ? 1 : -1);
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    const nextWrong = wrong + (isCorrect ? 0 : 1);
    setPicked(optionIndex);
    setLastCorrect(isCorrect);
    window.setTimeout(() => setScore(nextScore), 920);
    if (isCorrect) {
      window.setTimeout(() => setCorrect(nextCorrect), 520);
    } else {
      setCorrect(nextCorrect);
    }
    setWrong(nextWrong);

    const isFinalRound = nextScore >= 3 || nextScore <= -3 || index === questions.length - 1;
    window.setTimeout(() => {
      if (nextScore >= 3) return setResult("win");
      if (nextScore <= -3) return setResult("lose");
      if (index === questions.length - 1) return setResult("draw");
      setIndex((value) => value + 1);
      setPicked(null);
      setLastCorrect(null);
    }, isFinalRound ? 2300 : 2100);
  }

  function restart() {
    setQuestions(shuffle(QUESTION_BANK));
    setIndex(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setPicked(null);
    setLastCorrect(null);
    setResult("playing");
  }

  const title = result === "win" ? "漂亮！你赢啦" : result === "lose" ? "大灰狼获胜" : "势均力敌";
  const subtitle = result === "win" ? "大灰狼被你揍得晕头转向！" : result === "lose" ? "这次让它得意一小会儿吧。" : "十题结束，双方打成平手！";

  return (
    <main className={`${styles.game} ${lastCorrect === true ? styles.hit : ""}`}>
      <div className={styles.cloudOne} /><div className={styles.cloudTwo} />
      <section className={styles.shell}>
        <div className={styles.battleBar} aria-label={`当前战局值 ${score}` }>
          <Link href="/all" className={styles.back} aria-label={"\u8fd4\u56de\u4f11\u95f2\u9986"}>
            <ArrowLeft size={17} aria-hidden="true" />
            <span>{"\u8fd4\u56de"}</span>
          </Link>
          <div className={styles.barLabels}><span>🐺 狼王胜利</span><b>战局值 {score > 0 ? `+${score}` : score}</b><span>玩家胜利 🏆</span></div>
          <div className={styles.track}><div className={styles.trackLose} /><div className={styles.trackWin} /><i className={styles.marker} style={{ left: `${progress}%` }} /></div>
          <div className={styles.ticks}>{[-3,-2,-1,0,1,2,3].map(n => <span key={n}>{n > 0 ? `+${n}` : n}</span>)}</div>
        </div>

        <div className={styles.arena}>
          <section className={styles.card}>
            <div className={styles.questionMeta}><span>第 {index + 1} 题</span><span>选出正确答案</span></div>
            <h2>{question.question}</h2>
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => {
                const state = picked === null ? "" : optionIndex === question.answer ? styles.correct : optionIndex === picked ? styles.wrong : styles.dim;
                return <button key={option} className={state} onClick={() => choose(optionIndex)} disabled={picked !== null}><b>{String.fromCharCode(65 + optionIndex)}</b><span>{option}</span>{state === styles.correct && <Sparkles size={20} />}{state === styles.wrong && <X size={20} />}</button>;
              })}
            </div>
            <div className={styles.feedback} aria-live="polite">{lastCorrect === true ? "砰！回答正确，战局值 +1" : lastCorrect === false ? "哎呀！答错了，战局值 -1" : "答对三分，就能击败狼王！"}</div>
          </section>

          <section ref={stageRef} className={styles.stage} aria-label="卡通大灰狼动画">
            <div className={styles.sun} />
            <div className={`${styles.stars} ${score >= 2 ? styles.dizzy : ""}`}>{score >= 2 && <><i>★</i><i>✦</i><i>★</i></>}</div>
            <div ref={hammerRef} className={`${styles.hammer} ${lastCorrect ? styles.swing : ""}`} aria-hidden="true">
              <div className={styles.hammerMotion}>
                <span ref={hammerHeadRef} className={styles.hammerHead}><i /></span>
                <span className={styles.hammerHandle} />
              </div>
            </div>
            <div className={`${styles.impactFx} ${lastCorrect === true ? styles.impactActive : ""}`} aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><b>砰!</b>
            </div>
            <div className={`${styles.healingPill} ${lastCorrect === false ? styles.healingPillActive : ""}`} aria-hidden="true">
              <span><i /></span><b>{"回血 +1"}</b>
            </div>
            <div className={[styles.wolf, lastCorrect === true ? styles.justHit : "", ...wolfBattleClasses].filter(Boolean).join(" ")}>
              <div className={styles.ears}><i /><i /></div>
              <div ref={wolfHeadRef} className={styles.head}>
                <div className={styles.bump} />
                <div className={styles.brows}><i /><i /></div>
                <div className={styles.eyes}><i /><i /></div>
                <div className={styles.muzzle}><span className={styles.nose} /><span className={styles.mouth} /></div>
                <div className={styles.bruise} />
              </div>
              <div className={styles.body}><div className={styles.armLeft} /><div className={styles.armRight}><i /><i /></div><div className={styles.belly} /></div>
            </div>
            <div className={`${styles.dust} ${lastCorrect === true ? styles.dustActive : ""}`} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.ground} />
            <div className={styles.speech}>{getWolfSpeech(score)}</div>
          </section>
        </div>
      </section>

      {result !== "playing" && <div className={styles.overlay}><div className={styles.modal}>
        <div className={styles.resultIcon}>{result === "win" ? "🏆" : result === "lose" ? "🐺" : "🤝"}</div>
        <p className={styles.eyebrow}>本局结束</p><h2>{title}</h2><p>{subtitle}</p>
        <div className={styles.stats}><div><strong>{correct}</strong><span>答对</span></div><div><strong>{wrong}</strong><span>答错</span></div><div><strong>{score > 0 ? `+${score}` : score}</strong><span>战局值</span></div></div>
        <div className={styles.resultActions}>
          <Link href="/all" className={styles.resultBack}>
            <ArrowLeft size={19} aria-hidden="true" />
            {"\u8fd4\u56de"}
          </Link>
          <button onClick={restart}><RotateCcw size={19} />再玩一次</button>
        </div>
      </div></div>}
    </main>
  );
}

