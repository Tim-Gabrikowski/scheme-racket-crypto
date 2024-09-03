(require math/base)
(require math/number-theory)

(define maxP 4096)

(define (% n m) (modulo n m))

(define (calcPub g p a)
  (% (expt g a) p)
)

(define (calcKey p B a)
  (% (expt B a) p)
)

(define (exec f)
  (let ((p (next-prime (random-prime maxP))))
    (let (
          (g (random-integer 2 p))
          (a  (random-integer 2 (- p 1)))
          (b  (random-integer 2 (- p 1)))
          )
      (f p g a b)
      )
    )
)

(display "(p g a b A B Ka Kb)\n")
(exec (lambda (p g a b) (list p g a b (calcPub g p a) (calcPub g p b) (calcKey p (calcPub g p b) a) (calcKey p (calcPub g p a) b))))
