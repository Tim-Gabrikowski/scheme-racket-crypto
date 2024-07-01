; Import List functions from racket
(require racket/list)

(define (letter? c) (or (and (> (char->integer c) 64) (< (char->integer c) 91)) (and (> (char->integer c) 96) (< (char->integer c) 123))))  

; Häufigkeitsanalyse - Counterlist ( (#\A) (#\B) ... (#\a) (#\b) ... )
(define (createCounterList)
  (append (build-list 26 (lambda (n) (list (integer->char (+ n 65)) 0)))
          (build-list 26 (lambda (n) (list (integer->char (+ n 97)) 0)))
  )
)
; Liste Aktualisieren (Eigentliche Zählung)
(define (countChar c count)
  (list-update count
               (index-where count (lambda (n) (cond ((equal? (first n) c) #t) (else #f))))
               (lambda (n) (cons (first n) (list (+ 1 (second n)))))
  )
)

; Häufigkeitsanalyse - Schritt
(define (analyseStep text count)
  (cond ((null? text) count)
        (else (analyseStep (rest text) (countChar (first text) count)))
  )
)
; Häufigkeitsanalyse
(define (analyse s)
  (analyseStep (filter letter? (string->list s)) (createCounterList))
)
; Ausgabeliste von CaseSensitive zu Insensitive umwandeln
(define (convertCaseInsensitive lst)
  (build-list 26 (lambda (n) (list (integer->char (+ n 65))
                                   (+ (second (list-ref lst n)) (second (list-ref lst (+ 26 n))))
                             )
                 )
  )
)