(require racket/list)
(define (extract-nth-elements lst n k)
  (cond
    [(empty? lst) '()]
    [(< (length lst) k) '()]
    [(< (length lst) n) (list-ref lst (sub1 k))]
    [else (cons (list-ref lst (sub1 k)) (extract-nth-elements (drop lst n) n k))]))


(define (split-every-nth lst n)
  (define (loop k acc)
    (if (> k n)
        (reverse acc)
        (loop (add1 k) (cons (extract-nth-elements lst n k) acc))))
  (loop 1 '()))